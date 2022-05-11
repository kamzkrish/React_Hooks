import Moment from "moment";
import { DeleteProduct } from "../deleteModel";

export const ACTION_TYPE = {
  GET_MAIN_DATA: "GET_MAIN_DATA",
  GET_MAIN_DATA_PENDING: "GET_MAIN_DATA_PENDING",
  GET_MAIN_DATA_FULFILLED: "GET_MAIN_DATA_FULFILLED",
  GET_MAIN_DATA_REJECTED: "GET_MAIN_DATA_REJECTED",
  GET_DROPDOWN_DATA: "GET_DROPDOWN_DATA",
  GET_DROPDOWN_DATA_PENDING: "GET_DROPDOWN_DATA_PENDING",
  GET_DROPDOWN_DATA_FULFILLED: "GET_DROPDOWN_DATA_FULFILLED",
  GET_DROPDOWN_DATA_REJECTED: "GET_DROPDOWN_DATA_REJECTED",
  DELETE_ITEM: "DELETE_ITEM"
};

export const columns = [
  {
    Header: "SKU and Name",
    accessor: "sku",
    style: {
      color: "blue"
    }
  },
  {
    Header: "Primary unit",
    accessor: "primaryUnit"
  },
  {
    Header: "UPC code",
    accessor: "upc"
  },
  {
    Header: "Description",
    accessor: "description"
  },
  {
    Header: "Last updated",
    accessor: (d: any) => {
      return Moment(d.updatedAt).local().format("MM/DD/YYYY");
    }
  },
  {
    Header: "Delete",
    id: "delete",
    accessor: (str: any) => "delete",
    Cell: (tableProps: any) => (
      <div>
        <DeleteProduct tableProps={tableProps?.row?.original} />
      </div>
    )
  }
];
