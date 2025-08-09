import axios, { isAxiosError } from "axios";
import { type SetStateAction } from "react";

export const getShippingLabel = async ({
  setIsDownloading,
  setError,
  orderID,
}: {
  setIsDownloading: (value: SetStateAction<boolean>) => void;
  setError: (value: SetStateAction<string>) => void;
  orderID: string;
}) => {
  setIsDownloading(true);
  try {
    const response = await axios.get(`/next/printLabel?orderID=${orderID}`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${orderID}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    if (isAxiosError(error) && error.response?.data instanceof Blob) {
      const text: string = await error.response.data.text();
      // eslint-disable-next-line
      const errorData = JSON.parse(text);
      console.log("Error:", errorData);
      setError((errorData as string) || "Error downloading file");
    } else {
      console.log("Unknown error:", error);
      setError("Unknown error occurred");
    }
  } finally {
    setIsDownloading(false);
  }
};
