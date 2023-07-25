'use client';
import useProductsStore from '@app/store/products-store';
import { Container } from '@components';
import { IProduct } from '@packages/domains';
import { IconButton } from '@public/icons/icon-button';
import { Button, Checkbox, FileInput, Label, Select, Textarea, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, FormEventHandler, useMemo, useRef, useState } from 'react';

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  const { products, updateProduct } = useProductsStore();

  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const categories = useRef<HTMLSelectElement>(null);
  const disabled = useRef<HTMLInputElement>(null);

  const product = useMemo(() => {
    const findIndex = products.findIndex((p) => p.id === params.id);
    return products[findIndex];
  }, [products, params.id]);

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newProduct: IProduct = {
      ...product,
      name: name.current?.value ?? '',
      description: description.current?.value,
      disabled: !!disabled.current?.checked,
    };
    updateProduct(newProduct);
    router.push('/products');
  };

  return (
    <Container>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            placeholder="Name"
            required
            shadow
            type="text"
            defaultValue={product?.name}
            ref={name}
          />
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
            defaultValue={product?.description}
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
          <Checkbox id="disabled" defaultChecked={!!product?.disabled} ref={disabled} />
          <Label htmlFor="disabled" placeholder="Name">
            <span>disabled</span>
          </Label>
        </div>
        <div className="flex gap-4">
          <Button className="border-none bg-blue-500 px-2 py-1 font-semibold" type="submit">
            {/* <Link href={'/products'}>Update</Link> */}
            Update
          </Button>
          <Button className="border-none px-2 py-1">
            <Link href={'/products'}>Cancel</Link>
          </Button>
        </div>
      </form>
    </Container>
  );
}
