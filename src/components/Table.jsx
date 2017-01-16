import theme from 'components/Table.css'

import Checkbox from 'components/Checkbox'

const Table = ({children, selectable, fields, onSelect}) => {
    const allSelected = selectable && areAllSelected(children)
    const headers = getHeaders(fields)

    return (
        <table className={theme['table']}>
            <thead>
                <tr>
                    {selectable && 
                        <th className={theme['input-container']}>
                            <Checkbox checked={allSelected} onChange={selected => {
                                onSelect(children.map(data => ({
                                    ...data,
                                    selected
                                })))
                            }} />
                        </th>
                    }

                    {headers.map((header, index) =>
                        <th key={index} className={`${header.alignRight && theme['align-right']}`}>
                            {header.label}
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {children.map((row, index) =>
                    <tr key={index}>
                        {selectable &&
                            <td className={theme['input-container']}>
                                <Checkbox checked={row.selected} onChange={selected => {
                                    children[index].selected = selected

                                    onSelect(children, index)}
                                } />
                            </td>
                        }
                        
                        {headers.map((header, index) => {
                            const {key, label, formatter, alignRight} = header
                            const content = row[key]

                            return (
                                <td key={index} className={`${alignRight && theme['align-right']}`}>
                                    {typeof formatter === 'function'
                                        ? formatter(content)
                                        : content
                                    }
                                </td>
                            )
                        })}
                    </tr>
                )}
            </tbody>
        </table>
    )
}

Table.defaultProps = {
    fields: {},
    selectable: false,
    onSelect: () => {},
}

function getHeaders (fields) {
    return Object.keys(fields).map(key => {
        const {label, formatter, alignRight} = fields[key]

        return {
            key,
            label: label || key,
            formatter: fields[key].formatter,
            alignRight: alignRight || false
        }
    })
}

function areAllSelected (items) {
    return Array.isArray(items) && items.every(item => item.selected === true)
}

export default Table