import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productdataSelector } from "./redux/selector";
import { ChakraProvider } from "@chakra-ui/react";
import { getPage } from "./redux/actionCreators";
import {
  Button,
  ButtonGroup,
  Heading,
  InputGroup,
  Input,
  InputLeftElement
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { DataTable } from "./table";
import "./styles.css";
import { columns } from "./redux/constants";
import { AddProduct } from "./model";

const App = () => {
  const dispatch = useDispatch();
  const mainTableData = useSelector(productdataSelector);
  const [page, setPage] = useState(1);
  const dataTable = mainTableData?.data?.data;
  const total_pages = mainTableData?.data?.total_pages;
  const total = mainTableData?.data?.total;

  var [data, setData] = useState([]);
  const [search, setSearchData] = useState("");
  var [dataD, setDataD] = useState(data);

  useEffect(() => {
    dispatch(
      getPage({
        page: page
      })
    );
  }, [page]);

  useEffect(() => {
    setData(dataTable);
  }, [dataTable]);

  const next = () => (page < 10 ? setPage(page + 1) : 1);
  const previous = () => (page > 1 ? setPage(page - 1) : 1);

  useMemo(() => {
    if (!search) {
      return setDataD(dataTable);
    }
    return setDataD(
      dataTable?.filter((data: any) =>
        data.sku.toLowerCase().includes(search?.toLowerCase())
      )
    );
  }, [search, dataTable, page]);

  return (
    <>
      {
        <div style={{ padding: "30px" }}>
          <ChakraProvider>
            <Heading style={{ paddingBottom: "10px", fontSize: "30px" }}>
              {" "}
              Products
            </Heading>
            <div style={{ paddingBottom: "10px", maxWidth: "350px" }}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  onChange={(e) => setSearchData(e.target.value)}
                  // value={quickFilterInput}
                  focusBorderColor="blue.400"
                  placeholder="Search product SKU"
                />
              </InputGroup>
            </div>
            <div style={{ float: "right", marginTop: "-99px" }}>
              <AddProduct />
            </div>
            <ButtonGroup
              style={{ float: "right", marginTop: "-49px" }}
              variant="outline"
              spacing="6"
            >
              <div
                style={{ margin: "7px -19px" }}
              >{`Items ${page} - ${total_pages} of ${total}`}</div>
              <Button
                style={{
                  margin: "0px -19px 0 22px",
                  fontSize: "15px",
                  width: "90px"
                }}
                onClick={previous}
              >
                Previous
              </Button>
              <Button
                style={{ fontSize: "15px", width: "50px" }}
                onClick={next}
              >
                Next
              </Button>
            </ButtonGroup>

            {data?.length > 0 ? (
              <DataTable columns={columns} data={dataD} />
            ) : (
              ""
            )}
          </ChakraProvider>
        </div>
      }
    </>
  );
};

export default App;
