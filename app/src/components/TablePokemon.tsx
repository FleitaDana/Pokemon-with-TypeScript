import React, { useEffect, useState } from 'react'
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link, Pagination, PaginationItem } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link as LinkPagination } from 'react-router-dom';

const TablePokemon = ({listPokemon=[], page, count}) => {

  // const [listPokemon, setListPokemon] = useState([])


  // const location = useLocation();
  // const query = new URLSearchParams(location.search);
  // const page = parseInt(query.get('page') || '1', 10);

  // useEffect(() => {

  //   getPokemones(page)
  //     .then((res) => {
  //       setListPokemon(res.data.results)
  //     })
  // }, [page])


  /* const [pageValor, setPageValor] = React.useState(page); //empieza en pag = 0
  const [rowsPerPage, setRowsPerPage] = React.useState(20); //filas por pagina 20

  const handleChangePage = (event, newPage) => { //cambia pagina; cuando recibe un evento, setea a page la nueva pagina
    setPageValor(newPage);
  };

  const handleChangeRowsPerPage = (event) => { //cambia filas por pagina cuando recibe un evento
    setRowsPerPage(parseInt(event.target.value, 10)); //setea el numero de filas por pagina y
    setPageValor(0); //retorna a la pagina 0 con la cantidad de filas elegidas anteiormente
  };*/

  //const emptyRows =
   // 20 - Math.min(20, listPokemon.length - page * 20);  //calcula el numero de filas vacias que hay que agregar a la tabla para llegar al maximo de filas por pagina



  //ListPokemon es un array que contiene todos los pokemones que va a mostrar la tabla
  //page es el numero de pagina actual
  //rowsPerPage es que cantidad de filas por pagina

  //console.log(page);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      xs={12}
      p="20"
    >
      <Grid item
        justifyContent="center"
        alignItems="center"
        xs={12} md={12} lg={12}
        sx={{ margin: 3 }}>


        <TableContainer sx={{ fontStyle: 'oblique', border: 1, minWidth: 500 }} component={Paper}>

          <Pagination
            page={page}
            count={count}
            renderItem={(item) => (
              <PaginationItem
                component={LinkPagination}
                to={`/home${item.page === 1 ? '' : `?page=${item.page}`}`}
                {...item}
              />
            )}
          />

          {/* <TablePagination
            rowsPerPageOptions={[20, 40, 60]}
            component="div"
            count={listPokemon.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          <Table stickyHeader aria-label="simple table" xs={{ borderColor: 'gris' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ h1: { color: 'black' } }} align="center"><b>Name</b></TableCell>
                <TableCell align="center"><b>Especification</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

           
              {listPokemon
                //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //Extrae una porcion de la lista de pokemones utilizando el numero de pagina actual por la cantidad de filas elegidas
                .map((row) => ( //mapea esa porcion de Pokemones obtenidas en la linea anterior
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center" component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">
                      <Link underline="none" color="secondary" href={`/SeeDetails/${row.url.split("/")[6]}`}>See details <ArrowOutwardIcon sx={{ fontSize: 'small' }} /></Link>
                    </TableCell>
                  </TableRow>
                ))}
               {/* {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}  */}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
export default TablePokemon;
