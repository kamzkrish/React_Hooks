import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteItem } from "./redux/actionCreators";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text
} from "@chakra-ui/react";

export const DeleteProduct = (props: any) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = useCallback(() => {
    console.log("props.tableProps.row", props.tableProps);
    dispatch(deleteItem({ result: props.tableProps }));
    onClose();
  }, [props.tableProps]);

  return (
    <>
      <Button
        style={{ color: "white", backgroundColor: "red" }}
        onClick={onOpen}
      >
        Delete
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ paddingTop: "10px", fontWeight: "bold" }}>
            Delete Product
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text style={{ paddingTop: "10px", fontWeight: "bold" }} mb="8px">
              SKU
            </Text>
            <Text mb="8px">{props.tableProps.sku}</Text>
            <Text style={{ paddingTop: "10px", fontWeight: "bold" }} mb="8px">
              Name
            </Text>
            <Text mb="8px">{props.tableProps.name}</Text>
            <Text style={{ paddingTop: "10px", fontWeight: "bold" }} mb="8px">
              Description
            </Text>
            <Text mb="8px">{props.tableProps.description}</Text>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              style={{ backgroundColor: "red", color: "white" }}
              variant="ghost"
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
