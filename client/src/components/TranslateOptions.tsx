import React, { useState, useEffect } from "react";
// import { type TTranslateOptions, TranslateOptions, } from "./translateOptions";
// import { useForm, SubmitHandler } from "react-hook-form";
// // import { ajvResolver } from '@hookform/resolvers/ajv';
// import validator from "@rjsf/validator-ajv8";
// import Form from "@rjsf/core";

export default function TranslateOptionsComponent() {




    return (
        // <Form schema={TranslateOptions}
        //     validator={validator}
        //     // onChange={console.log}
        //     onSubmit={console.log}
        //     onError={console.error} />
        <>{"None"}</>
    );
}

// type p<T> = {
//     title: string;
//     description: string;
//     default: T,
//     type: "string" | "boolean";
// };
// const BooleanField = ({ name, field }: { name: string, field: p<boolean>; }) => (
//     <div className="field">

//         <div className="control">
//             <label className="checkbox">
//                 <input type="checkbox" defaultChecked={field.default} />
//                 {field.title}
//             </label>
//         </div>
//         <p className="help is-success">{field.description}</p>
//     </div>
// );

// const InputField = ({ name, title, description, defaultValue, advanced }: { name: string, title: string; description: string; defaultValue: string; advanced: boolean; }) => (
//     <div className="field">
//         <label className="label" htmlFor={name}>{title}</label>
//         <div className="control">
//             <input className="input" name={name} type="text" placeholder="Text input" defaultValue={defaultValue} />
//         </div>
//         <p className="help">{description}</p>
//     </div>
// );