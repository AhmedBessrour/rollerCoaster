let [spots, nbrOfRides, group] = readline().split(' ').map((x: string) => Number(x));
let queue: Array<number> = [];
for (let i = 0; i < group; i++) {
    const pi: number = parseInt(readline());
    queue.push(pi)
}

interface CacheValues<T> {
    [key: string]: Array<T>;
}

class RollerCoaster {
    cacheValues: CacheValues<number> = {};
    group: number;
    nbrOfRides: number;
    spots: number;
    queue: Array<number> = [];
    constructor(spots: number, nbrOfRides: number,  group: number, queue: Array<number>) {
        this.spots = spots;
        this.nbrOfRides = nbrOfRides;
        this.group = group;
        this.queue = queue;
    }

    calculateEarnings() {
        let earnings = 0;
        let index = 0;
        let spotsTaken = 0;
        for (spotsTaken; this.nbrOfRides--; spotsTaken = 0) {
            if (index in this.cacheValues) {
                [spotsTaken, index] = this.cacheValues[index];
            } else {
                const start = index;
                for (let i = 0; i < group && this.queue[index] + spotsTaken <= this.spots; i++) {
                    spotsTaken += this.queue[index];
                    index = index === group - 1 ? 0 : index + 1;
                }
                this.cacheValues[start] = [spotsTaken, index];
            }
            earnings += spotsTaken;
        }
        return earnings;
    }
}

const todaysRollerCoaster = new RollerCoaster(spots, nbrOfRides, group, queue);

console.log(todaysRollerCoaster.calculateEarnings());
