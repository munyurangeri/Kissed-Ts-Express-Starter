declare module 'wagner-core' {
    function factory(key: string, service: any): void;
    function invoke(context: any): any;
}