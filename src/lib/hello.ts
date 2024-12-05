export function logToConsole(...items: unknown[]) {
    console.log('%cInspect', 'background-color: black; padding: 5px; color: hotpink; border-radius: 8px;', ...items);
    // console.dirxml(...items);
}