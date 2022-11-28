import { Form } from 'Components/Form/Types'

export function findIndexOfObject(arrayContainer: Form, searchParam: string | number) {
  return arrayContainer?.builtFormMetadata?.pages?.findIndex((x) => x.id === searchParam)
}
