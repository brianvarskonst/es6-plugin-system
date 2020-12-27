export default class DateFormatHelper {
    public static readonly defaultFormat = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };

    static format(date: string, options = {}): string {
        if (date === null) {
            return '';
        }

        const dateObj = new Date(date);

        // eslint-disable-next-line
        // @ts-ignore
        if (isNaN(dateObj)) {
            return '';
        }

        const dateTimeFormatter = new Intl.DateTimeFormat(
            navigator.language,
            { ...DateFormatHelper.defaultFormat, ...options }
        );

        return dateTimeFormatter.format(dateObj);
    }
}