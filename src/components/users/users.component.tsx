import React, { useState, useEffect } from "react";
import TableComponent, { TableComponentProps } from "../Table/Table";
import { usersService } from "../../services/users.service";
import { useDispatch, useSelector } from "react-redux";
import { usersSlice, getUsers, User, users_ } from "../../reducers/users.reducer";

const data: User[] = [];

export const UsersComponent = () => {
  const [tableProps, setTableProps] = useState<TableComponentProps>({
    columns: [ 
      {title: 'Name', index: 'name'},
      {title: 'Partner', index: 'partner', 
        render: (row: any) => <a href="www.google.com"> 
            {row['partner']} 
          </a>
      },
      {title: 'Rate', index: 'rate'},
    ],
    data: [...data],
    // onEdit: (row) => { alert(JSON.stringify(row)); },
    // onSort: sortHandler,
    tableClassName: 'clients-table'
  });

  const users = useSelector(users_);
  // console.log(users);
  const dispactch = useDispatch();
  useEffect(() => {
    dispactch(getUsers());
  }, [dispactch]);

  useEffect(() => {
    console.log(users);
    setTableProps({...tableProps, data: users});
  }, [users]);
  

  return (<div>
      <h2>Users</h2>
      <TableComponent tableProps={tableProps} />
    </div>
  );
};
