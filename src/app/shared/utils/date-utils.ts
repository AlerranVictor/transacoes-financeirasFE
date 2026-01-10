export class DateUtils{
    static mesmoMesAno(
        data: Date,
        mes: number,
        ano: number
    ): boolean {
        return (data.getMonth() + 1 === mes && data.getFullYear() === ano)
    }
}