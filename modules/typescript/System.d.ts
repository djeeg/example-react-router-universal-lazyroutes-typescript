interface ISystemExt extends Object {
    import?: (path: string) => any;
}

declare var System: ISystemExt;
