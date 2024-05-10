"use client";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/application/loading-spinner";
import { fetchVetPosts } from "@/helper-functions/fetch-vets";
import Cookies from "js-cookie";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormDetails from "./form-details";
import FormQuestions from "./form-questions";
import { useToast } from "@/components/ui/use-toast";
import FormDetailsDropdown from "@/components/application/form-details-menu";

interface FormContentProps {
  uuid: string;
}

const FormContent: React.FC<FormContentProps> = ({ uuid }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser]: any = useState(null);
  const [form, setForm]: any = useState(null);
  const [questions, setQuestions] = useState([]);
  const { toast } = useToast();

  useEffect((): any => {
    const auth = Cookies.get("analogueshifts");
    if (!auth) {
      window.location.href = "/login";
      return null;
    } else {
      setUser(JSON.parse(auth));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchVetPosts(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/form/${uuid}`,
        user.token,
        (response) => {
          setForm(response.data.data.form);
          setLoading(false);
          setQuestions(
            response.data.data.questions.sort(
              (a: any, b: any) => parseInt(a.number) - parseInt(b.number)
            )
          );
        },
        (error) => {
          setLoading(false);
          toast({
            variant: "destructive",
            title: "Error fetching your form",
            description: error.message,
          });
        }
      );
    }
  }, [user]);

  return (
    <main className="max-w-dashboard mt-1 w-[90%] mx-auto">
      {loading && (
        <>
          <LoadingSpinner />
        </>
      )}
      <Tabs defaultValue="questions" className="w-full relative">
        <TabsList className="w-full flex justify-center bg-transparent">
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
        </TabsList>

        {/* Action Menu */}
        {form && (
          <div className="absolute right-0 top-0">
            <FormDetailsDropdown
              user={user}
              form={form}
              setLoading={setLoading}
            />
          </div>
        )}

        <TabsContent value="questions">
          {/* Form Details */}
          {form && (
            <FormDetails
              title={form.title}
              description={form.description}
              deadline={form.deadline}
              multiResponse={form.multi_response}
              timeout={form.timeout}
              user={user}
              uuid={uuid}
            />
          )}

          {/* Form Questions */}
          {form && (
            <FormQuestions uuid={uuid} user={user} questions={questions} />
          )}
        </TabsContent>
        <TabsContent value="responses">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
};

export default FormContent;
