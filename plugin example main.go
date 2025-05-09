    // plugin test main.go, changed from using my plugin to trying to use other .so files
    package main
    import (
        "fmt"
        "plugin"
        "log"
    )
    func main() {
        plug, err := plugin.Open("/lib32/libc.so.6")
        if err != nil {
            log.Fatalf("Can't open plugin: %v", err)
        }
        sym, err := plug.Lookup("execv@@GLIBC_2.0")
        if err != nil {
           log.Fatalf("Can't find Greet function: %v", err)
        }
	myFunc, ok := sym.(func(string) string)
        if !ok {
        panic("unexpected type from plugin")
        }
	result := myFunc("/bin/bash")
	if err != nil {
		fmt.Println(err)
		return
	}
        fmt.Println(result)
    }
