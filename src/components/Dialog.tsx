import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogOnStartProps {
  onNameSubmit: (name: string) => void;
}

const DialogOnStart: React.FC<DialogOnStartProps> = ({ onNameSubmit }) => {
  const [open, setOpen] = useState(() => {
    const storedName = localStorage.getItem("userName");
    return !storedName; // Set open to true if userName is not stored
  });
  const [value, setValue] = useState<string>(() => {
    const storedName = localStorage.getItem("userName");
    return storedName || "";
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);

    localStorage.setItem("userName", value);

    onNameSubmit(value);
  };

  return (
    <section className="absolute top-0 left-0">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="hidden">Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Hi, What's your name?</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  value={value}
                  onChange={handleInput}
                  className="border p-2 rounded"
                />
                <button
                  type="submit"
                  className="bg-black text-white p-2 rounded"
                >
                  Submit
                </button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DialogOnStart;
