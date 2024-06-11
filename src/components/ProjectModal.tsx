import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"

import { Button } from '../ui/button';
import { CircleChevronRight } from "lucide-react";

interface ProjectModalProps {
    title: string;
    description: string;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ title, description }) => {
    const navigate = useNavigate();
    const routeToProjectPage = () => {
        navigate('/project');
        console.log('Route to project page');
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={routeToProjectPage}>
                    <CircleChevronRight className="mr-2 h-4 w-4" /> More about the project
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProjectModal;
