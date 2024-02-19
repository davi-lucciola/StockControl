import { toast } from "react-toastify";
import { HttpError, HttpWarning } from "../../api/http";

export async function handleRequest(
  callback: () => Promise<string>,
): Promise<boolean> {
  try {
    const detail = await callback();
    toast.success(detail);
    return true;
  } catch (error) {
    if (error instanceof HttpWarning) {
      toast.warn(error.message);
    } else if (error instanceof HttpError) {
      toast.error(error.message);
    } else {
      toast.error("Houve um erro ao realizar sua solicitação.");
    }

    return false;
  }
}
