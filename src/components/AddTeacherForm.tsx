"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import Combobox from "@/components/Combobox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { University, Subject } from "@/types";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { UserPlus } from "lucide-react";

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

    if (data.otherSubject) {
      const subjectsArray = data.otherSubject
        .toLowerCase()
        .split(",")
        .map((subject) => subject.trim());

      await addSubjectToDatabase(subjectsArray);
    }

    if (data.otherUniversity || data.otherSubject) {
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

    reset();
  };

  const addSubjectToDatabase = async (subjects: string[]) => {
    const subjectsData = await fetch("/api/subjects");
    const subjectsJson = await subjectsData.json();

    subjects.forEach(async (subject) => {
      if (subjectsJson.some((s: Subject) => s.name === subject)) return;
      try {
        const response = await fetch("/api/subjects", {
          method: "POST",
          body: JSON.stringify({ name: subject }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to add subject");
        }
      } catch (error) {
        console.error("Error adding subject:", error);
      }
    });
  };
  return (
    <>
      <Toaster closeButton={true} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col items-center text-left justify-center gap-10 w-full">
              <div className="w-full">
                <Input
                  type="text"
                  placeholder="Imię i nazwisko prowadzącego zajęcia"
                  className="w-full bg-background"
                  {...register("name", { required: "Imię i nazwisko jest wymagane" })}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div className="w-full">
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
                <Input
                  placeholder="Inne (Fizyka, Matematyka)"
                  className="mt-3 bg-background"
                  {...register("otherSubject")}
                />
                <p className="text-sm text-muted-foreground">
                  Wpisuj przedmioty separując je przecinkiem <q> , </q>
                </p>
              </div>
              <div className="w-full">
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
          <Button type="submit">
            <UserPlus />
            Dodaj
          </Button>
        </CardFooter>
      </form>
    </>
  );
};

export default AddTeacherForm;
