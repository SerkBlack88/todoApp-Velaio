export interface Todo {
    id:              string;
    taskName:        string;
    limitDate:       string;
    isCompleted:     boolean;
    personsInCharge: PersonsInCharge[];
}

export interface PersonsInCharge {
    personName: string;
    age:        string;
    abilities:  string[];
}

