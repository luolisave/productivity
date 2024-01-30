export function randomString(numOfChar = 32): string {
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    if (numOfChar < 8) {
        throw('Random String should have at least 8 characters');
    }
    for (let i = 0; i < numOfChar; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    return outString;
}
