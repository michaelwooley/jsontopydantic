import React, { useState, useEffect } from "react";
import { type TTranslateOptions, TranslateOptions, } from "./translateOptions";
import { useForm, SubmitHandler } from "react-hook-form";
// import { ajvResolver } from '@hookform/resolvers/ajv';

export default function TranslateOptionsComponent() {


    const {
        register,
        handleSubmit,
        formState: { errors },
        ...a
    } = useForm<TTranslateOptions>({
        // resolver: ajvResolver(TranslateOptions)
    });
    const onSubmit: SubmitHandler<TTranslateOptions> = (data, e) => {
        e?.preventDefault();
        console.log(data);
    };


    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {Object.entries(TranslateOptions.properties).map(([k, v]) => {
                return (<div key={k}>
                    {k} - {v.type}
                </div>);

            })}
            <input type="submit" />
        </form>
    );
}

type p<T> = {
    title: string;
    description: string;
    default: T,
    type: "string" | "boolean";
};
const BooleanField = ({ name, field }: { name: string, field: p<boolean>; }) => (
    <div className="field">

        <div className="control">
            <label className="checkbox">
                <input type="checkbox" defaultChecked={field.default} />
                {field.title}
            </label>
        </div>
        <p className="help is-success">{field.description}</p>
    </div>
);

const InputField = ({ name, title, description, defaultValue, advanced }: { name: string, title: string; description: string; defaultValue: string; advanced: boolean; }) => (
    <div className="field">
        <label className="label" htmlFor={name}>{title}</label>
        <div className="control">
            <input className="input" name={name} type="text" placeholder="Text input" defaultValue={defaultValue} />
        </div>
        <p className="help">{description}</p>
    </div>
);