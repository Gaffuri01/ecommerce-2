import React from "react";
import Menu from "../../components/Menu";

import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import { FaTrash } from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

import { FormatCurrency } from "../../utils/formatCurrency";
import { useStyles } from "../products/styles";
import { useShop } from "../../context/shop";

function Shop() {
  const classes = useStyles();
  const { productsShop, setProductsShop } = useShop();

  console.log(productsShop);

  function removeItem(id) {
    const auxList = productsShop.filter((item) => item.id !== id);

    setProductsShop(auxList);
  }

  const addItem = (id) => {
    const product = productsShop.find((item) => item.id === id);
    product.quantidade = product.quantidade + 1;
    setProductsShop((preProductsShop) => {
      return [...new Set([...preProductsShop, product])];
    });
  };

  const retItem = (id) => {
    const product = productsShop.find((item) => item.id === id);
    product.quantidade = product.quantidade - 1;
    setProductsShop((preProductsShop) => {
      return [...new Set([...preProductsShop, product])];
    });
  };

  return (
    <>
      <Menu />

      <Container sx={{ py: 5 }} maxWidth="md" component="main">
        <Typography component="h6" variant="h6">
          Carrinho de Compras
        </Typography>
        <br></br>

        <React.Fragment>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>PRODUTO</b>
                </TableCell>
                <TableCell align="center">
                  <b>PREÇO</b>
                </TableCell>
                <TableCell align="center">
                  <b>QUANTIDADE</b>
                </TableCell>
                <TableCell align="center">
                  <b>TOTAL</b>
                </TableCell>
                <TableCell align="center">
                  <b>REMOVER</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productsShop.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell align="center">{product.valueFormatted}</TableCell>
                  <TableCell align="center">
                    {
                      <div
                        className={classes.controls}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (product.quantidade > 1) {
                              retItem(product.id);
                            }
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>

                        <Typography>{product.quantidade}</Typography>

                        <IconButton onClick={() => addItem(product.id)}>
                          <AddIcon />
                        </IconButton>
                      </div>
                    }
                  </TableCell>
                  <TableCell align="center">
                    {FormatCurrency(product.value * product.quantidade)}
                  </TableCell>
                  <TableCell align="center">
                    {
                      <IconButton
                        color="primary"
                        onClick={() => {
                          removeItem(product.id);
                        }}
                      >
                        <FaTrash fontSize="large" />
                      </IconButton>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </Container>
    </>
  );
}

export default Shop;
