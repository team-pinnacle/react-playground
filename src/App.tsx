import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TableComponent, { TableComponentProps, SortOrder, SortOrderType } from './components/Table/Table';
import useForm from './hooks/useForm';


const data = [
  {name: 'Name1', partner: 'Partner 1', rate: 20},
  {name: 'Name2', partner: 'Partner 2', rate: 50},
  {name: 'Name2', partner: 'Partner 3', rate: 10},
];

const table1Props: TableComponentProps = {
  columns: [ 
    {title: 'Fruit', index: 'fruit'},
    {title: 'Rate', index: 'raate'}
  ],
  data: [{fruit: 'Orange', rate: 10}, {fruit: 'Apple', rate: 20}],
  onEdit: (row) => { alert(JSON.stringify(row)); }
};

function App() {
  useEffect(() => {
    // On load of compoennet
    console.log('APp loaded');
  }, []);

  console.log('app here');
  const sortHandler = useCallback((sortOrder: SortOrder) => {
    console.log(sortOrder);
    if (sortOrder.order === SortOrderType.NONE) {
      setTableProps({...tableProps, data: [...data]});
      return;
    }

    const res = tableProps.data.sort((a: any, b: any) => {
      if (sortOrder.order === SortOrderType.ASC) {
        return a[sortOrder.column] - b[sortOrder.column];
      } else {
        return b[sortOrder.column] - a[sortOrder.column]
      }
    });

    setTableProps({...tableProps, data: res});
  }, [data]);

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
    onEdit: (row) => { alert(JSON.stringify(row)); },
    onSort: sortHandler
  });

  useEffect(() => {
    console.log('tableProps changed');
  }, [tableProps]);

  const [name, setName] = useState('Pawan');
  const {
    form,
    updateForm
  } = useForm({name: 'Pawan', email: 'abc@ac.co'})

  return (
    <div className="App">
      <Header />
      <TableComponent tableProps={tableProps} />
      <TableComponent tableProps={table1Props} />

      <form>
        <input name="name" value={form.name} onChange={updateForm} />
        <input name="email" value={form.email} onChange={updateForm} />
      </form>
      
      {form.name}
    </div>
  );
}

export default App;
