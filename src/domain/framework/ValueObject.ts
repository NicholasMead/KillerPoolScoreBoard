export abstract class ValueObject {
    public equals(obj: any): boolean {
        if (typeof obj != typeof this)
            return false;
        for (var property in this) {
            if (typeof obj[property] == "undefined")
                return false;
            if (obj[property] != this[property])
                return false;
        }
        return true;
    }
}