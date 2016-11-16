app.factory('$DateService', function () {
    return {
        addMonth: function (dateBase) {
            const MONTH = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
            dateBase.setDate(1)
            var nb = dateBase.getMonth()

            var month = {
                'title': MONTH[dateBase.getMonth()],
                'dates': []
            }

            var row = []
            for(var i = 0; i < dateBase.getDay(); i++) {
                row.push('')
            }

            while(dateBase.getMonth() == nb) {
                if(row.length % 7 == 0) {
                    month.dates.push(row)
                    row = []
                }
                row.push({
                    'day': dateBase.getDate(),
                    'month': dateBase.getMonth(),
                    'year': dateBase.getFullYear(),
                    'fullDate': dateBase.toJSON()
                })
                dateBase.setTime(dateBase.getTime() + 86400000)
            }

            for(var i = row.length; i < 7; i++)
                row.push('')

            month.dates.push(row)
            return month
        }
    }
});