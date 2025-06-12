export const renderId = (uuid: string): string => {
    const modifiedId = uuid.slice(-6).toUpperCase(); // last 6 characters
    return modifiedId;
};
