declare global {
  namespace NodeJS {
    interface Process {
      getActiveResourcesInfo: () => any;
      _getActiveHandles: () => Array<WriteStream>;
    }
  }
}

export async function main() {
  setInterval(() => {}, 1000);
  console.log(process._getActiveHandles());
}

main();
