'use client';

import useProductsStore from '@app/store/products-store';
import { Container } from '@components';
import { IProduct } from '@packages/domains';
import { Button, Checkbox, FileInput, Label, Select, Textarea, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef } from 'react';

export default function Page() {
  const { addProduct } = useProductsStore();

  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const categories = useRef<HTMLSelectElement>(null);
  const disabled = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newProduct: IProduct = {
      id: 'new',
      name: name.current?.value ?? '',
      description: description.current?.value,
      disabled: !!disabled.current?.checked,
      categories: [],
    };
    addProduct(newProduct);
    router.push('/products');
  };

  return (
    <Container>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput id="name" placeholder="Name" required shadow type="text" ref={name} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <Textarea
            id="description"
            placeholder="Leave a description..."
            required
            rows={4}
            className="p-2.5"
            ref={description}
          />
        </div>
        <div id="select">
          <div className="block">
            <Label htmlFor="categories" value="Select category" />
          </div>
          <Select id="categories" required ref={categories}>
            <option>Categories 1</option>
            <option>Categories 2</option>
            <option>Categories 3</option>
            <option>Categories 4</option>
          </Select>
        </div>
        <div id="fileUpload">
          <div className="block">
            <Label htmlFor="file" value="Upload image" />
          </div>
          <FileInput id="file" />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="disabled" ref={disabled} />
          <Label htmlFor="disabled" placeholder="Name">
            <span>disabled</span>
          </Label>
        </div>
        <div className="flex gap-4">
          <Button className="border-none bg-blue-500 px-2 py-1 font-semibold" type="submit">
            Save
          </Button>
          <Button className="border-none px-2 py-1">
            <Link href={'/products'}>Cancel</Link>
          </Button>
        </div>
      </form>
    </Container>
  );
}
