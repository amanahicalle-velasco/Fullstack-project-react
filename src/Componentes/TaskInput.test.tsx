import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskInput from "./TaskInput";

describe("TaskInput", () => {

  it("llama a onAddTask cuando el usuario escribe y hace clic en Agregar", async () => {

    const onAddTask = vi.fn();

    render(<TaskInput onAddTask={onAddTask} />);

    const input = screen.getByPlaceholderText("Agrega una nueva tarea");
    const boton = screen.getByRole("button", { name: /agregar/i });

    await userEvent.type(input, "Estudiar Vitest");
    await userEvent.click(boton);

    expect(onAddTask).toHaveBeenCalledWith("Estudiar Vitest");

  });

});