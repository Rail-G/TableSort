class InfoTable {
    constructor (arr) {
        this.arrKey = Object.keys(arr[0])
        this.arrData = arr
    }

    createTableHeader(arrKey) {
        const tr = document.createElement('tr');
        for (let index = 0; index < arrKey.length; index++) {
            const th = document.createElement('th')
            th.textContent = arrKey[index]
            th.scope = "col"
            th.addEventListener('click',  () => {
              let reversed = 1;
              let arrow = '';
              if (th.textContent.substring(th.textContent.length - 1) == '↓') {
                arrow = '↑';
                reversed = -1;
              } else {
                arrow = '↓'
              }
              document.querySelectorAll('th').forEach(elem => {
                if (elem.textContent.substring(elem.textContent.length - 1) == '↓' || elem.textContent.substring(elem.textContent.length - 1) == '↑') {
                  elem.textContent = elem.textContent.substring(0, elem.textContent.length - 1)
                }
              })
              th.textContent = arrKey[index] + arrow
              // eslint-disable-next-line no-unused-vars
              const [headersRow, ...rows] = document.querySelectorAll('table tr')

              rows.sort((a, b) => {
                const aRow = a.getAttribute(`data-${arrKey[index]}`);
                const bRow = b.getAttribute(`data-${arrKey[index]}`);
                if(isNaN(Number(aRow)) && isNaN(Number(bRow))) {
                  if (reversed == 1) {
                    return aRow.localeCompare(bRow)
                  }
                  return bRow.localeCompare(aRow)
                }
                if (Number(aRow) < Number(bRow)) {
                  return -1 * reversed
                } else if (Number(aRow) > Number(bRow)) {
                  return 1 * reversed
                }
              })
              rows.forEach(row => document.querySelector('table').appendChild(row))
            })
            tr.appendChild(th);
        }
        console.log(tr)
        return tr
    }
    createTableBody(arrData) {
        const result = []
        for (const element of arrData) {
            const tr = document.createElement('tr');
            Object.entries(element).forEach(([key, value]) => {
                const td = document.createElement('td')
                td.textContent = value
                tr.dataset[key] = value;
                tr.appendChild(td)
            })
            result.push(tr)
        }
        console.log(result)
        return result
    }

    appendToBody() {
        const tableHeaders = this.createTableHeader(this.arrKey)
        const tableBody = this.createTableBody(this.arrData)
        const body = document.querySelector('body')
        const table = document.createElement('table')
        table.appendChild(tableHeaders)
        tableBody.forEach(elem => {
            table.appendChild(elem)
        })
        body.appendChild(table)
    }
}

const obj = new InfoTable([
    {
      "id": 26,
      "title": "Побег из Шоушенка",
      "imdb": 9.30,
      "year": 1994
    },
    {
      "id": 25,
      "title": "Крёстный отец",
      "imdb": 9.20,
      "year": 1972
    },
    {
      "id": 27,
      "title": "Крёстный отец 2",
      "imdb": 9.00,
      "year": 1974
    },
    {
      "id": 1047,
      "title": "Тёмный рыцарь",
      "imdb": 9.00,
      "year": 2008
    },
    {
      "id": 223,
      "title": "Криминальное чтиво",
      "imdb": 8.90,
      "year": 1994
    }
  ])

obj.appendToBody()