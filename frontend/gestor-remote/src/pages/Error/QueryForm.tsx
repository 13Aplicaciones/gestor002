import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { BandPresentation, Direction, FooterForm, InputField } from "ux-ui";
import * as yup from "yup";

const QueryForm = ({ onFind }: { onFind: (data: any) => void }) => {
  const schema = yup.object({
    indexError: yup
      .string()
      .max(128, "El indice debe tener máximo 10 caracteres"),
    message: yup
      .string()
      .max(1024, "El message debe tener máximo 124 caracteres"),
    size: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      indexError: "",
      message: "",
      size: "3",
    },
  });

  
  const submitForm = (data: any) => {
    if (onFind) {
      onFind(data);
    }
  };

  const resetForm = () => {
    if (onFind) {
      onFind({});
    }
    reset();
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <InputField
        title="Indice"
        columns={BandPresentation.column_3}
        placeholder="ERR001"
        directionLabel={Direction.horizontal}
        register={register("indexError")}
        messageError={errors.indexError?.message}
      />
      <InputField
        title="Mensaje"
        columns={BandPresentation.column_3}
        placeholder="mensaje"
        directionLabel={Direction.horizontal}
        register={register("message")}
        messageError={errors.message?.message}
      />
      <FooterForm
        directionLabel={Direction.horizontal}
        columns={BandPresentation.column_2}
      >
        <Button type="submit">Buscar</Button>
        <Button type="button" onClick={() => resetForm()}>
          Limpiar
        </Button>
      </FooterForm>
    </form>
  );
};

export { QueryForm };
