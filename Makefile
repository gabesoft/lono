PATH := $(PATH):node_modules/.bin
PUBLIC := build/public

srv_source_files := $(shell ag src/server -g js)
srv_build_files  := $(srv_source_files:src/%.js=build/%.mjs)

cli_source_files := $(shell ag src/client -g js)
cli_build_files  := $(cli_source_files:src/%.js=build/%.js)
cli_build_entry  := build/public/index.js

scss_files := $(shell ag src/client -g scss)
css_files  := $(scss_files:src/client/%.scss=build/public/%.css)

# Compile all files
all: build-srv build-cli css public


# Build individual server files
build/%.mjs: src/%.js
	@mkdir -p $(dir $@)
	flow-remove-types -p -m -a -o $@ $<

# Build individual client files
build/%.js: src/%.js
	@mkdir -p $(dir $@)
	babel $< -o $@

# Build individual scss files
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
	@cp public/*.{png,ico,json} $(PUBLIC)/
	@sed "s.%PUBLIC_URL%.." public/index.html > $(PUBLIC)/index.html

# Create the public directory
public-dir:
	@mkdir -p $(PUBLIC)


# Compile scss files to css and output to build directory
css: $(css_files)

# Compile scss files to css on files changes
css-watch:
	@ag src -g scss | entr -r sh -c "$(MAKE) css"


# Build client source files
build-cli: $(cli_build_entry)

# Build client sources on file changes
build-cli-watch:
	@ag src/client -g js | entr -r sh -c "$(MAKE) build-cli"

# Build the client javascript bundle
$(cli_build_entry): $(cli_build_files)
	webpack


# Check JavaScript files for type errors
flow:
	@flow status --color always --include-warnings

# Check the JavaScript files for type errors on file changes
flow-watch:
	@ag src -g js | entr -r sh -c "$(MAKE) flow"

# Install flow types for npm dependencies
flow-typed:
	@flow-typed install


# Clean build files
clean:
	@$(RM) -r build

# Install npm dependencies
setup:
	@npm install . -d


.PHONY: run run-watch clean flow flow-watch flow-typed setup

