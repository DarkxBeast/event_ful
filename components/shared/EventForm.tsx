"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator";
import * as z from "zod";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { useUploadThing } from "@/lib/uploadthing";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }
      : eventDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }

    try {
      if (type === "Create") {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });
        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } else if (type === "Update" && eventId) {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`,
        });
        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="border border-gray-300 p-4 md:p-8 max-w-2xl mx-auto mt-4 rounded-2xl bg-primary-50/20 shadow-lg shadow-stroke-500">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Event title"
                      {...field}
                      className="border border-stroke-500 p-2 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      {...field}
                      className="border border-stroke-500 h-full p-2 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 w-auto mt-12">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <Image
                        src="/assets/icons/location-grey.svg"
                        alt="location"
                        width={24}
                        height={24}
                      />
                      <Input
                        placeholder="Event location"
                        {...field}
                        className="border border-stroke-500 p-2 rounded-xl"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="ml-12" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                      />
                      <p className="text-gray-600">Start Date:</p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date | null) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy h:mm aa"
                        className="border border-stroke-500 p-2 rounded-xl"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-3">
                      <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                      />
                      <p className="text-gray-600">End Date:</p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date | null) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy h:mm aa"
                        className="border border-stroke-500 p-2 rounded-xl"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <Image
                        src="/assets/icons/rupee.svg"
                        alt="price"
                        width={24}
                        height={24}
                      />
                      <Input
                        type="number"
                        placeholder="Price"
                        {...field}
                        className="border border-stroke-500 p-2 rounded-xl"
                      />
                      
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <Image
                        src="/assets/icons/link.svg"
                        alt="link"
                        width={24}
                        height={24}
                      />
                      <Input
                        placeholder="URL"
                        {...field}
                        className="border border-stroke-500 p-2 rounded-xl"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex justify-center">
            <Button
              type="submit"
              className="btn-primary p-2 rounded-xl w-1/3"
            >
              {type === "Create" ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;
