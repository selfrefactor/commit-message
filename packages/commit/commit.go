package main

import (
	"fmt"
	"log"
	"os/exec"
)

func main() {
	var commitMode string
	var commitTag string
	var commitMessage string

	fmt.Println("Commit mode")
	fmt.Println("\nfeat | fix | support | test | service | docs")
	fmt.Scanln(&commitMode)

	fmt.Println("Commit tag?(optional)")
	fmt.Println("\nrefactor | style | important and so on")
	fmt.Scanln(&commitTag)

	fmt.Println("Commit message?")
	fmt.Scanln(&commitMessage)

	cmd := exec.Command("run", "commit", "--mode", commitMode, "--tag", commitTag, "--message", commitMessage)
	stdout, err := cmd.Output()
	fmt.Print(string(stdout))

	if err != nil {
		log.Fatal(err)
	}
}
