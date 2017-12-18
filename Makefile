PATH := node_modules/.bin:$(PATH)

source_files := $(shell ag src -g js)
build_files  := $(source_files:src/%.js=build/%.mjs)

# Run the application server
run: build
	node --experimental-modules build/server/app.mjs

# Run the application server and restart on source file changes
run-watch:
	ag src -g js | entr -r sh -c $(MAKE) run

build/%.mjs: src/%.js
	mkdir -p $(dir $@)
	flow-remove-types -p -m -o $@ $<

# Build all source files
build: $(build_files)

# Clean build files
clean:
	$(RM) -r build

.PHONY: run run-watch clean

