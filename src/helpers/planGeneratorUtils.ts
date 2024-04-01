// PlanGeneratorUtils.ts

// Function to calculate the distance between two geographical coordinates using the Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180; // Latitude difference in radians
    const dLon = (lon2 - lon1) * Math.PI / 180; // Longitude difference in radians
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

// Function to group nearby locations based on their geographical coordinates
export function groupNearbyLocations(locations: any[]): any[] {
    const groupedLocations: any[] = [];

    // Iterate over each location
    locations.forEach(location => {
        let foundGroup = false;

        // Check if the location can be added to an existing group
        for (const group of groupedLocations) {
            // Calculate distance between the current location and the first location in the group
            const distance = calculateDistance(
                location.latitude,
                location.longitude,
                group[0].latitude,
                group[0].longitude
            );

            // If the distance is within a certain threshold (e.g., 5 kilometers), add the location to the group
            if (distance < 5) {
                group.push(location);
                foundGroup = true;
                break;
            }
        }

        // If the location couldn't be added to any existing group, create a new group
        if (!foundGroup) {
            groupedLocations.push([location]);
        }
    });

    return groupedLocations;
}
