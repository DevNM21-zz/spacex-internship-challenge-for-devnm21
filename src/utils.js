export const getLaunchStatus = (upcoming, launchStatus) => {
	if (upcoming) return 'Upcoming';
	return launchStatus ? 'Success': 'Failed';
};