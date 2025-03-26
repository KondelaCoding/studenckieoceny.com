"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import Combobox from "@/components/Combobox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { University, Subject } from "@/types";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

interface FormData {
  name: string;
  email: string;
  primaryUniversity: University | null;
  secondaryUniversity: University | null;
  primarySubject: Subject | null;
  secondarySubject: Subject | null;
  otherUniversity: string;
  otherSubject: string;
}

const AddTeacherForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      primaryUniversity: null,
      secondaryUniversity: null,
      primarySubject: null,
      secondarySubject: null,
      otherUniversity: "",
      otherSubject: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // Prepare the data for submission, the API only needs the id of the university and subject
    const newData = {
      name: data.name,
      totalRatingValue: 0,
      numberOfVotes: 0,
      universities: [data.primaryUniversity?.id ?? "", data.secondaryUniversity?.id ?? ""],
      subjects: [data.primarySubject?.id ?? "", data.secondarySubject?.id ?? ""],
    };
    if (data.otherUniversity || data.otherSubject) {
      console.log("Send email for approval:", data);
      try {
        const response = await fetch("/api/notify-admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teacherProps: { name: data.name, otherUniversity: data.otherUniversity, otherSubject: data.otherSubject },
            email: data.email,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send email");
        }

        toast.success("Email sent to admin for approval!");
      } catch (error) {
        console.error("Error sending email:", error);
        toast.error("Failed to send email. Please try again later.");
      }
    } else {
      if (!data.primaryUniversity || !data.primarySubject) {
        toast.error("Musisz wybrać przynajmniej jedną uczelnie i przedmiot");
        return;
      }
      console.log("Add teacher to database:", newData);
      const response = await fetch("/api/teachers", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success("Prowadzący dodany pomyślnie!");
      } else {
        toast.error("Wystąpił błąd podczas dodawania prowadzącego, spróbuj ponownie później.");
        return;
      }
    }

    reset(); // Reset the form after submission
  };

  return (
    <>
      <Toaster closeButton={true} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col items-center text-left justify-center gap-10 w-full">
              <div className="w-full">
                <label htmlFor="name" className="w-full">
                  Imię i nazwisko
                </label>
                <Input
                  type="text"
                  placeholder="Imię i nazwisko prowadzącego"
                  className="w-full mt-3 bg-background"
                  {...register("name", { required: "Imię i nazwisko jest wymagane" })}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div className="w-full">
                <label htmlFor="universities" className="w-full">
                  Uczelnie
                </label>
                <div className="flex flex-col w-full gap-5 mt-3 sm:flex-row">
                  <Controller
                    name="primaryUniversity"
                    control={control}
                    render={({ field }) => <Combobox data="universities" title="uczelnię" onChange={field.onChange} />}
                  />
                  <Controller
                    name="secondaryUniversity"
                    control={control}
                    render={({ field }) => <Combobox data="universities" title="uczelnię" onChange={field.onChange} />}
                  />
                </div>
                <Input placeholder="Inna" className="mt-3 bg-background" {...register("otherUniversity")} />
              </div>
              <div className="w-full">
                <label htmlFor="subjects" className="w-full">
                  Przedmioty
                </label>
                <div className="flex flex-col w-full gap-5 mt-3 sm:flex-row">
                  <Controller
                    name="primarySubject"
                    control={control}
                    render={({ field }) => <Combobox data="subjects" title="przedmiot" onChange={field.onChange} />}
                  />
                  <Controller
                    name="secondarySubject"
                    control={control}
                    render={({ field }) => <Combobox data="subjects" title="przedmiot" onChange={field.onChange} />}
                  />
                </div>
                <Input placeholder="Inne" className="mt-3 bg-background" {...register("otherSubject")} />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="w-full text-md mt-5">
                  Twój email
                </label>
                <Input
                  type="email"
                  placeholder="Twój email"
                  className="w-full bg-background mt-3"
                  {...register("email", {
                    required: "Email jest wymagany",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Nieprawidłowy adres email",
                    },
                  })}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-10 flex-col items-end">
          <p className="leading-7 text-muted-foreground text-sm text-right mb-3">
            Wybierając inną uczelnie bądź przedmiot nasza moderacja weryfikuje podane informacje.
          </p>
          <Button type="submit">Dodaj</Button>
        </CardFooter>
      </form>
    </>
  );
};

export default AddTeacherForm;
