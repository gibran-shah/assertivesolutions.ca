import React from 'react';
import {
    useTable,
    useGroupBy,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
} from 'react-table';
import './Table.scss';

function Table(props) {
    const columns = React.useMemo(() => [
        {
            Header: 'title',
            accessor: 'titleCol'
        },
        {
            Header: 'body',
            accessor: 'bodyCol'
        },
        {
            Header: 'last updated',
            accessor: 'updatedAtCol'
        },
        {
            Header: 'image',
            accessor: 'imageUrlCol'
        }
    ], []);

    const dataArray = [];

    for (var index = 0; index < props.posts.length; index++) {
        const post = props.posts[index];
        dataArray.push({
            titleCol: post.title,
            bodyCol: post.body,
            updatedAtCol: post.updatedAt,
            imageUrlCol: post.imageUrl[0]
        });
    }

    const data = React.useMemo(() => dataArray, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    let odd = true;

    return (
        <div>
            {
                rows.map(row => {
                    let imageClass = 'post-image ' + (odd ? 'left' : 'right');
                    odd = !odd;

                    prepareRow(row);
                    
                    const title = row.cells.find(c => c.render('Header') === 'title').value;
                    const body = row.cells.find(c => c.render('Header') === 'body').value;
                    const updatedAt = row.cells.find(c => c.render('Header') === 'last updated').value;
                    const imageUrl = row.cells.find(c => c.render('Header') === 'image').value;
                    
                    return (
                        <div className="post">
                            <div className="image-title-updated-at">
                                <p>{title}</p>
                                <p>{updatedAt}</p>
                            </div>
                            <div className="post-body">
                                <p><img src={imageUrl} className={imageClass} />{body}</p>
                            </div>
                            <hr />
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Table;