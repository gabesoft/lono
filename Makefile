PATH := $(PATH):node_modules/.bin
PUBLIC := build/public

all_js_files := $(shell ag src -g js)
srv_source_files := $(shell ag src/server -g js)
srv_build_files  := $(srv_source_files:src/%.js=build/%.mjs)

build/%.mjs: src/%.js
	@mkdir -p $(dir $@)
	@flow-remove-types -p -m -a -o $@ $<

# Run the application server
run: build
	@node --experimental-modules build/server/app.mjs

# Run the application server and restart on source file changes
run-watch: public css
	@ag src/server -g js | entr -r sh -c "$(MAKE) run"

# Create the public directory
public-dir:
	@mkdir -p $(PUBLIC)

# Build all public files
public: public-dir
	@cp public/*.{png,ico,json} $(PUBLIC)/
	@sed "s.%PUBLIC_URL%.." public/index.html > $(PUBLIC)/index.html

# Compile scss files to css and output to build directory
css: public-dir
	@node-sass --include-path node_modules src/client/app.scss > $(PUBLIC)/app.css

# Watch scss files and compile to css when changes are detected
css-watch:
	@ag src -g scss | entr -r sh -c "$(MAKE) css"

# Build all source files
build: $(srv_build_files)

# Clean build files
clean:
	@$(RM) -r build

# Install npm dependencies
setup:
	@npm install . -d

# Install flow types for npm dependencies
flow-typed:
	@flow-typed install

# Check JavaScript files for type errors
flow:
	@flow check src

# Check the JavaScript files for type errors on file changes
flow-watch:
	@ag src -g js | entr -r sh -c "$(MAKE) flow"

.PHONY: run run-watch clean flow flow-watch flow-typed setup

