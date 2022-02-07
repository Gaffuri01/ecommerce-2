import React, { useState } from "react";
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
import Products from "../products/index";

function Shop() {
  const classes = useStyles();
  const { productsShop } = useShop();
  const [amount, setAmount] = useState(1);

  console.log(productsShop);

  const listaProdutos = productsShop;

  function removeItem(id) {
    listaProdutos.splice(id);
  }

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
                            if (amount > 1) {
                              setAmount(amount - 1);
                            }
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>

                        <Typography>{amount}</Typography>

                        <IconButton
                          onClick={() => {
                            setAmount(amount + 1);
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                    }
                  </TableCell>
                  <TableCell align="center">
                    {FormatCurrency(product.value * amount)}
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
