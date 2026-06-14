"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import PageHero from "@/components/airport/PageHero";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  type: z.enum(["suggestion", "complaint"]),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

export default function ComplaintsPage() {
  const t = useTranslations("complaints");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      const supabase = createClient();
      const { error: dbError } = await supabase.from("feedback").insert([data]);
      if (dbError) throw dbError;
      setSubmitted(true);
      reset();
    } catch {
      setError("Failed to submit. Please try again.");
    }
  };

  return (
    <>
      <PageHero image="/brand/ql/complaints.jpg" title={t("title")} subtitle={t("subtitle")} />
      <div className="max-w-2xl mx-auto px-4 py-12">
      {submitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {t("success")}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("name")}</label>
          <input {...register("name")} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("email")}</label>
          <input {...register("email")} type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("type")}</label>
          <select {...register("type")} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] bg-white">
            <option value="">{t("selectType")}</option>
            <option value="suggestion">{t("suggestion")}</option>
            <option value="complaint">{t("complaint")}</option>
          </select>
          {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("message")}</label>
          <textarea {...register("message")} rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] resize-none" />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#004488] transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : t("submit")}
        </button>
      </form>
      </div>
    </>
  );
}
