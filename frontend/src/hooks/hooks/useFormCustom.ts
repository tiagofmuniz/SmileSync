import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function useFormCustom<typeData>(
  schema: any,
  defaultValuesForm: any
) {
  const {
    handleSubmit: handleSubmitCustom,
    register: registerCustom,
    formState: { errors },
  } = useForm<typeData>({
    mode: 'all',
    defaultValues: defaultValuesForm,
    resolver: zodResolver(schema)
  });

  return {
    handleSubmit: handleSubmitCustom as unknown as SubmitHandler<typeData>,
    register: registerCustom,
    errors,
  };
}
