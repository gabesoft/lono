PUBLIC	:= build/public
BIN			:= node_modules/.bin
PATH		:= $(PATH):$(BIN)
ESLINT  := $(BIN)/eslint

srv_source_files := $(shell ag src/server -g js)
srv_build_files  := $(srv_source_files:src/%.js=build/%.mjs)

cli_source_files := $(shell ag src/client -g js)
cli_build_files  := $(cli_source_files:src/%.js=build/%.js)
cli_build_output := build/public/index.js build/public/vendor.js

scss_files := $(shell ag src/client -g scss)
css_files  := $(scss_files:src/client/%.scss=build/public/%.css)
css_output := build/public/App.css

# Compile all files
all: build-srv build-cli css public

# Setup dependencies and compile all files
all-dev: setup flow-typed all

build/%.mjs: src/%.js
	@mkdir -p $(dir $@)
	flow-remove-types -p -m -a -o $@ $<

build/%.js: src/%.js
	@mkdir -p $(dir $@)
	babel $< -o $@

build/public/%.css: src/client/%.scss
	node-sass --include-path node_modules -o $(dir $@) $<


# Build server source files
build-srv: $(srv_build_files)

# Run the application server
run: build-srv
	@node --experimental-modules build/server/app.mjs

# Run the application server and restart on source file changes
run-watch:
	ag src/server -g js | entr -r sh -c "$(MAKE) run"


# Run the rfresh server used for reloading client assets
rfresh:
	@rfresh -p 3001 -r "/::/$(PUBLIC)/" -s 300

# Build all public files
public: public-dir
	@cp public/icons/*.{png,ico} $(PUBLIC)/
	@cp public/*.{png,html,json} $(PUBLIC)/
	@cp -r public/webfonts $(PUBLIC)/webfonts

# Create the public directory
public-dir:
	@mkdir -p $(PUBLIC)


# Compile scss files to css and output to build directory
css: $(css_output)

$(css_output): $(css_files)

# Compile scss files to css on files changes
css-watch:
	@ag src -g scss | entr -r sh -c "$(MAKE) css"


# Build client source files
build-cli: $(cli_build_output)

$(cli_build_output): $(cli_build_files)
	webpack

# Build client source files and show analysis
analyze-cli: export SHOW_ANALYSIS=true
analyze-cli: build-cli

# Build client sources on file changes
build-cli-watch:
	@ag src/client -g js | entr -r sh -c "$(MAKE) $(cli_build_files)"

# Start webpack in watch mode
webpack-watch:
	webpack --watch


# Check JavaScript files for type errors
flow:
	@flow status --color always --include-warnings

# Check the JavaScript files for type errors on file changes
flow-watch:
	@ag src -g js | entr -r sh -c "$(MAKE) flow"

# Install flow types for npm dependencies
flow-typed:
	@$(RM) -r flow-typed
	@flow-typed install


# Run eslint
eslint:
	@$(ESLINT) src

# Run eslint on JavaScript file changes
eslint-watch:
	@ag src -g js | entr -r sh -c "$(MAKE) eslint"


# Run sass-lint
sass-lint:
	@sass-lint -q -v -s scss src/**/*.scss

sass-lint-watch:
	@ag src -g scss | entr -r sh -c "$(MAKE) sass-lint"

# Clean build files
clean:
	@$(RM) -r build

# Install npm dependencies
setup:
	@npm install . -d


# Kill all running servers
kill:
	-lsof -i:3000 | grep node | awk '{print $$2}' | xargs kill -9
	-lsof -i:3001 | grep node | awk '{print $$2}' | xargs kill -9

# Run all processes needed for development
dev: all kill
	@sh -c "$(MAKE) run-watch & \
				  $(MAKE) build-cli-watch & \
				  $(MAKE) webpack-watch & \
				  $(MAKE) css-watch & \
				  $(MAKE) rfresh & \
				  $(MAKE) flow-watch & \
				  $(MAKE) eslint-watch & \
					$(MAKE) sass-lint-watch & \
				  wait"


.PHONY: run run-watch clean flow flow-watch flow-typed setup

