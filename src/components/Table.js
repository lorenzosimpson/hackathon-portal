import moment from 'moment';
import React from 'react';
import { formatDate } from './Dashboard';

function Table(props) {
    const { classN, headers, body } = props;
    const keys = ['id', 'start_date', 'end_date', 'name', 'location', 'is_open']
    return (
        <table className={`table ${classN.table}`}>
            <thead className={classN.thead}>
                <tr>
                {headers.map(h => (<th>{h}</th>))}
                </tr>
            </thead>
            <tbody>
                {body.map((hackathon, index) => (
                    <tr key={index}>
                       {keys.map(property => (
                           (property.includes('date')) ? (
                            <td>{formatDate(hackathon[property])}</td>
                           ) :
                        (<td>{hackathon[property]}</td>)
                       ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;