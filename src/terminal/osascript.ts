export function completeCommand(command: string) {
  const script = (command: string) => `
on run argv
  tell application "iTerm"
    tell current session of current window
      write text "${command.replace(/"/g, `\\"`)}" newline NO
    end tell
  end tell
end run
`;

  const osascript = require('child_process').spawn('osascript');

  osascript.stdin.write(script(command));
  osascript.stdin.end();
}
