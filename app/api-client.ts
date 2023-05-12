//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.18.2.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

export interface IHabitsClient {

    getUserHabits(userId: string | null): Promise<UserHabitsDto>;

    createHabitList(userId: string | null, command: NewListCommand): Promise<HabitListDto>;

    createHabit(userId: string | null, command: NewHabitCommand): Promise<HabitListDto>;

    updateHabit(userId: string | null, command: UpdateHabitCommand): Promise<HabitDto>;

    deleteHabit(userId: string | null, command: DeleteHabitCommand): Promise<Habit>;

    deleteHabitList(userId: string | null, command: DeleteListCommand): Promise<HabitList>;

    updateHabitList(userId: string | null, command: UpdateListCommand): Promise<HabitList>;

    getCompletions(userId: string | null, days: number): Promise<CompletionDto[]>;

    completeHabit(userId: string | null, command: CompleteHabitCommand): Promise<CompletionDto>;
}

export class HabitsClient implements IHabitsClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    getUserHabits(userId: string | null): Promise<UserHabitsDto> {
        let url_ = this.baseUrl + "/api/Habits/{userId}";
        if (userId === undefined || userId === null)
            throw new Error("The parameter 'userId' must be defined.");
        url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetUserHabits(_response);
        });
    }

    protected processGetUserHabits(response: Response): Promise<UserHabitsDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = UserHabitsDto.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<UserHabitsDto>(null as any);
    }

    createHabitList(userId: string | null, command: NewListCommand): Promise<HabitListDto> {
        let url_ = this.baseUrl + "/api/Habits/{userId}/newList";
        if (userId === undefined || userId === null)
            throw new Error("The parameter 'userId' must be defined.");
        url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCreateHabitList(_response);
        });
    }

    protected processCreateHabitList(response: Response): Promise<HabitListDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = HabitListDto.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<HabitListDto>(null as any);
    }

    createHabit(userId: string | null, command: NewHabitCommand): Promise<HabitListDto> {
        let url_ = this.baseUrl + "/api/Habits/{userId}/newHabit";
        if (userId === undefined || userId === null)
            throw new Error("The parameter 'userId' must be defined.");
        url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCreateHabit(_response);
        });
    }

    protected processCreateHabit(response: Response): Promise<HabitListDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = HabitListDto.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<HabitListDto>(null as any);
    }

    updateHabit(userId: string | null, command: UpdateHabitCommand): Promise<HabitDto> {
        let url_ = this.baseUrl + "/api/Habits/{userId}/updateHabit";
        if (userId === undefined || userId === null)
            throw new Error("The parameter 'userId' must be defined.");
        url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUpdateHabit(_response);
        });
    }

    protected processUpdateHabit(response: Response): Promise<HabitDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = HabitDto.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<HabitDto>(null as any);
    }

    deleteHabit(userId: string | null, command: DeleteHabitCommand): Promise<Habit> {
        let url_ = this.baseUrl + "/api/Habits/{userId}/deleteHabit";
        if (userId === undefined || userId === null)
            throw new Error("The parameter 'userId' must be defined.");
        url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeleteHabit(_response);
        });
    }

    protected processDeleteHabit(response: Response): Promise<Habit> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = Habit.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<Habit>(null as any);
    }

    deleteHabitList(userId: string | null, command: DeleteListCommand): Promise<HabitList> {
        let url_ = this.baseUrl + "/api/Habits/{userId}/deleteList";
        if (userId === undefined || userId === null)
            throw new Error("The parameter 'userId' must be defined.");
        url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeleteHabitList(_response);
        });
    }

    protected processDeleteHabitList(response: Response): Promise<HabitList> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = HabitList.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<HabitList>(null as any);
    }

    updateHabitList(userId: string | null, command: UpdateListCommand): Promise<HabitList> {
        let url_ = this.baseUrl + "/api/Habits/{userId}/updateList";
        if (userId === undefined || userId === null)
            throw new Error("The parameter 'userId' must be defined.");
        url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUpdateHabitList(_response);
        });
    }

    protected processUpdateHabitList(response: Response): Promise<HabitList> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = HabitList.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<HabitList>(null as any);
    }

    getCompletions(userId: string | null, days: number): Promise<CompletionDto[]> {
        let url_ = this.baseUrl + "/api/Habits/{userId}/completions/{days}";
        if (userId === undefined || userId === null)
            throw new Error("The parameter 'userId' must be defined.");
        url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
        if (days === undefined || days === null)
            throw new Error("The parameter 'days' must be defined.");
        url_ = url_.replace("{days}", encodeURIComponent("" + days));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetCompletions(_response);
        });
    }

    protected processGetCompletions(response: Response): Promise<CompletionDto[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(CompletionDto.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<CompletionDto[]>(null as any);
    }

    completeHabit(userId: string | null, command: CompleteHabitCommand): Promise<CompletionDto> {
        let url_ = this.baseUrl + "/api/Habits/{userId}/complete";
        if (userId === undefined || userId === null)
            throw new Error("The parameter 'userId' must be defined.");
        url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCompleteHabit(_response);
        });
    }

    protected processCompleteHabit(response: Response): Promise<CompletionDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = CompletionDto.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<CompletionDto>(null as any);
    }
}

export interface IUsersClient {

    createUser(command: CreateUserCommand): Promise<User>;
}

export class UsersClient implements IUsersClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    createUser(command: CreateUserCommand): Promise<User> {
        let url_ = this.baseUrl + "/api/Users/users/new";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCreateUser(_response);
        });
    }

    protected processCreateUser(response: Response): Promise<User> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = User.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<User>(null as any);
    }
}

export class UserHabitsDto implements IUserHabitsDto {
    habitLists?: HabitListDto[];

    constructor(data?: IUserHabitsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["habitLists"])) {
                this.habitLists = [] as any;
                for (let item of _data["habitLists"])
                    this.habitLists!.push(HabitListDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UserHabitsDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserHabitsDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.habitLists)) {
            data["habitLists"] = [];
            for (let item of this.habitLists)
                data["habitLists"].push(item.toJSON());
        }
        return data;
    }
}

export interface IUserHabitsDto {
    habitLists?: HabitListDto[];
}

export class HabitListDto implements IHabitListDto {
    id?: number;
    title?: string;
    createdOn?: Date;
    habits?: HabitDto[];
    points?: number;
    level?: number;

    constructor(data?: IHabitListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.title = _data["title"];
            this.createdOn = _data["createdOn"] ? new Date(_data["createdOn"].toString()) : <any>undefined;
            if (Array.isArray(_data["habits"])) {
                this.habits = [] as any;
                for (let item of _data["habits"])
                    this.habits!.push(HabitDto.fromJS(item));
            }
            this.points = _data["points"];
            this.level = _data["level"];
        }
    }

    static fromJS(data: any): HabitListDto {
        data = typeof data === 'object' ? data : {};
        let result = new HabitListDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["createdOn"] = this.createdOn ? this.createdOn.toISOString() : <any>undefined;
        if (Array.isArray(this.habits)) {
            data["habits"] = [];
            for (let item of this.habits)
                data["habits"].push(item.toJSON());
        }
        data["points"] = this.points;
        data["level"] = this.level;
        return data;
    }
}

export interface IHabitListDto {
    id?: number;
    title?: string;
    createdOn?: Date;
    habits?: HabitDto[];
    points?: number;
    level?: number;
}

export class HabitDto implements IHabitDto {
    id?: number;
    title?: string | undefined;
    note?: string | undefined;
    createdOn?: Date;
    reminder?: Date | undefined;
    listId?: number;

    constructor(data?: IHabitDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.title = _data["title"];
            this.note = _data["note"];
            this.createdOn = _data["createdOn"] ? new Date(_data["createdOn"].toString()) : <any>undefined;
            this.reminder = _data["reminder"] ? new Date(_data["reminder"].toString()) : <any>undefined;
            this.listId = _data["listId"];
        }
    }

    static fromJS(data: any): HabitDto {
        data = typeof data === 'object' ? data : {};
        let result = new HabitDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["note"] = this.note;
        data["createdOn"] = this.createdOn ? this.createdOn.toISOString() : <any>undefined;
        data["reminder"] = this.reminder ? this.reminder.toISOString() : <any>undefined;
        data["listId"] = this.listId;
        return data;
    }
}

export interface IHabitDto {
    id?: number;
    title?: string | undefined;
    note?: string | undefined;
    createdOn?: Date;
    reminder?: Date | undefined;
    listId?: number;
}

export class NewListCommand implements INewListCommand {
    userId?: string;
    title?: string;

    constructor(data?: INewListCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.userId = _data["userId"];
            this.title = _data["title"];
        }
    }

    static fromJS(data: any): NewListCommand {
        data = typeof data === 'object' ? data : {};
        let result = new NewListCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userId"] = this.userId;
        data["title"] = this.title;
        return data;
    }
}

export interface INewListCommand {
    userId?: string;
    title?: string;
}

export class NewHabitCommand implements INewHabitCommand {
    listId?: number;
    title?: string;
    note?: string | undefined;

    constructor(data?: INewHabitCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.listId = _data["listId"];
            this.title = _data["title"];
            this.note = _data["note"];
        }
    }

    static fromJS(data: any): NewHabitCommand {
        data = typeof data === 'object' ? data : {};
        let result = new NewHabitCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["listId"] = this.listId;
        data["title"] = this.title;
        data["note"] = this.note;
        return data;
    }
}

export interface INewHabitCommand {
    listId?: number;
    title?: string;
    note?: string | undefined;
}

export class UpdateHabitCommand implements IUpdateHabitCommand {
    habit?: Habit;

    constructor(data?: IUpdateHabitCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.habit = _data["habit"] ? Habit.fromJS(_data["habit"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UpdateHabitCommand {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateHabitCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["habit"] = this.habit ? this.habit.toJSON() : <any>undefined;
        return data;
    }
}

export interface IUpdateHabitCommand {
    habit?: Habit;
}

export class Habit implements IHabit {
    id?: number;
    title?: string | undefined;
    note?: string | undefined;
    reminder?: Date | undefined;
    createdOn?: Date;
    streak?: number;
    habitListId?: number;

    constructor(data?: IHabit) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.title = _data["title"];
            this.note = _data["note"];
            this.reminder = _data["reminder"] ? new Date(_data["reminder"].toString()) : <any>undefined;
            this.createdOn = _data["createdOn"] ? new Date(_data["createdOn"].toString()) : <any>undefined;
            this.streak = _data["streak"];
            this.habitListId = _data["habitListId"];
        }
    }

    static fromJS(data: any): Habit {
        data = typeof data === 'object' ? data : {};
        let result = new Habit();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["note"] = this.note;
        data["reminder"] = this.reminder ? this.reminder.toISOString() : <any>undefined;
        data["createdOn"] = this.createdOn ? this.createdOn.toISOString() : <any>undefined;
        data["streak"] = this.streak;
        data["habitListId"] = this.habitListId;
        return data;
    }
}

export interface IHabit {
    id?: number;
    title?: string | undefined;
    note?: string | undefined;
    reminder?: Date | undefined;
    createdOn?: Date;
    streak?: number;
    habitListId?: number;
}

export class DeleteHabitCommand implements IDeleteHabitCommand {
    habitId?: number;

    constructor(data?: IDeleteHabitCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.habitId = _data["habitId"];
        }
    }

    static fromJS(data: any): DeleteHabitCommand {
        data = typeof data === 'object' ? data : {};
        let result = new DeleteHabitCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["habitId"] = this.habitId;
        return data;
    }
}

export interface IDeleteHabitCommand {
    habitId?: number;
}

export class HabitList implements IHabitList {
    id?: number;
    title?: string | undefined;
    userId?: string;
    createdOn?: Date;
    habits?: Habit[];

    constructor(data?: IHabitList) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.title = _data["title"];
            this.userId = _data["userId"];
            this.createdOn = _data["createdOn"] ? new Date(_data["createdOn"].toString()) : <any>undefined;
            if (Array.isArray(_data["habits"])) {
                this.habits = [] as any;
                for (let item of _data["habits"])
                    this.habits!.push(Habit.fromJS(item));
            }
        }
    }

    static fromJS(data: any): HabitList {
        data = typeof data === 'object' ? data : {};
        let result = new HabitList();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["userId"] = this.userId;
        data["createdOn"] = this.createdOn ? this.createdOn.toISOString() : <any>undefined;
        if (Array.isArray(this.habits)) {
            data["habits"] = [];
            for (let item of this.habits)
                data["habits"].push(item.toJSON());
        }
        return data;
    }
}

export interface IHabitList {
    id?: number;
    title?: string | undefined;
    userId?: string;
    createdOn?: Date;
    habits?: Habit[];
}

export class DeleteListCommand implements IDeleteListCommand {
    listId?: number;

    constructor(data?: IDeleteListCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.listId = _data["listId"];
        }
    }

    static fromJS(data: any): DeleteListCommand {
        data = typeof data === 'object' ? data : {};
        let result = new DeleteListCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["listId"] = this.listId;
        return data;
    }
}

export interface IDeleteListCommand {
    listId?: number;
}

export class UpdateListCommand implements IUpdateListCommand {
    habitList?: HabitList;

    constructor(data?: IUpdateListCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.habitList = _data["habitList"] ? HabitList.fromJS(_data["habitList"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UpdateListCommand {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateListCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["habitList"] = this.habitList ? this.habitList.toJSON() : <any>undefined;
        return data;
    }
}

export interface IUpdateListCommand {
    habitList?: HabitList;
}

export class CompletionDto implements ICompletionDto {
    habitId?: number;
    completedOn?: Date;
    points?: number;
    level?: number;

    constructor(data?: ICompletionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.habitId = _data["habitId"];
            this.completedOn = _data["completedOn"] ? new Date(_data["completedOn"].toString()) : <any>undefined;
            this.points = _data["points"];
            this.level = _data["level"];
        }
    }

    static fromJS(data: any): CompletionDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompletionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["habitId"] = this.habitId;
        data["completedOn"] = this.completedOn ? this.completedOn.toISOString() : <any>undefined;
        data["points"] = this.points;
        data["level"] = this.level;
        return data;
    }
}

export interface ICompletionDto {
    habitId?: number;
    completedOn?: Date;
    points?: number;
    level?: number;
}

export class CompleteHabitCommand implements ICompleteHabitCommand {
    userId?: string;
    habitId?: number;
    date?: Date;

    constructor(data?: ICompleteHabitCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.userId = _data["userId"];
            this.habitId = _data["habitId"];
            this.date = _data["date"] ? new Date(_data["date"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): CompleteHabitCommand {
        data = typeof data === 'object' ? data : {};
        let result = new CompleteHabitCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userId"] = this.userId;
        data["habitId"] = this.habitId;
        data["date"] = this.date ? this.date.toISOString() : <any>undefined;
        return data;
    }
}

export interface ICompleteHabitCommand {
    userId?: string;
    habitId?: number;
    date?: Date;
}

export class User implements IUser {
    userId?: string;
    displayName?: string;
    points?: number;

    constructor(data?: IUser) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.userId = _data["userId"];
            this.displayName = _data["displayName"];
            this.points = _data["points"];
        }
    }

    static fromJS(data: any): User {
        data = typeof data === 'object' ? data : {};
        let result = new User();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userId"] = this.userId;
        data["displayName"] = this.displayName;
        data["points"] = this.points;
        return data;
    }
}

export interface IUser {
    userId?: string;
    displayName?: string;
    points?: number;
}

export class CreateUserCommand implements ICreateUserCommand {
    userId?: string;
    displayName?: string;

    constructor(data?: ICreateUserCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.userId = _data["userId"];
            this.displayName = _data["displayName"];
        }
    }

    static fromJS(data: any): CreateUserCommand {
        data = typeof data === 'object' ? data : {};
        let result = new CreateUserCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userId"] = this.userId;
        data["displayName"] = this.displayName;
        return data;
    }
}

export interface ICreateUserCommand {
    userId?: string;
    displayName?: string;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}