import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";

export default function TaskHookForm({ kisiler, submitFn }) {
  const { register, handleSubmit, reset, formState: { errors, isValid }} = useForm({ defaultValues: { task: "", description: "", people: "" } });

  const onSubmit = (data) => {
    submitFn({ id: nanoid(5), ...data, status: "yapılacak" });
    reset();
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      {/* Başlık alanı */}
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          placeholder="Başlık girin"
          type="text"
          {...register("title", {
            required: { value: true, message: "Isim giriniz" },
            minLength: { value: 3, message: "En az 3 karakter giriniz" },
          })}
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>

      {/* Açıklama alanı */}
      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          placeholder="Açıklama girin"
          {...register("description", {
            required: { value: true, message: "Aciklama giriniz" },
            minLength: { value: 10, message: "En az 10 karakter giriniz" },
          })}
        ></textarea>
        {errors.description && (
          <p className="input-error">{errors.description.message}</p>
        )}
      </div>

      {/* İnsanlar alanı */}
      <div className="form-line">
        <label className="input-label">Kişiler</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  validate: (value) =>
                    value.length > 0
                      ? value.length <= 3 || "En fazla 3 kisi secebilirsiniz"
                      : "En az 1 kisi seciniz",
                })}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="input-error">{errors.people.message}</p>
        )}
      </div>

      {/* Kaydet ve temizle butonları */}
      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
