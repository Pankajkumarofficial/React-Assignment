import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Checkbox, Collapse, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Department } from '../types/types';

interface Props {
    departments: Department[];
}

const DepartmentList: React.FC<Props> = ({ departments }) => {
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
    const [selected, setSelected] = useState<{ [key: number]: boolean }>({});

    const handleToggleExpand = (id: number) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleToggleSelect = (id: number, isSubDepartment?: boolean, parentId?: number) => {
        setSelected((prev) => {
            const newSelected = { ...prev, [id]: !prev[id] };
            if (isSubDepartment && parentId !== undefined) {
                const parentDept = departments.find((dept) => dept.id === parentId);
                if (parentDept) {
                    const allSubSelected = parentDept.subDepartments.every((sub) => newSelected[sub.id]);
                    newSelected[parentId] = allSubSelected;
                }
            } else {
                const department = departments.find((dept) => dept.id === id);
                if (department) {
                    department.subDepartments.forEach((sub) => {
                        newSelected[sub.id] = newSelected[id];
                    });
                }
            }
            return newSelected;
        });
    };

    useEffect(() => {
        departments.forEach((department) => {
            const allSubSelected = department.subDepartments.every((sub) => selected[sub.id]);
            if (allSubSelected && department.subDepartments.length > 0) {
                setSelected((prev) => ({ ...prev, [department.id]: true }));
            }
        });
    }, [selected, departments]);

    return (
        <List>
            {departments.map((department) => (
                <div key={department.id}>
                    <ListItemButton onClick={() => handleToggleExpand(department.id)}>
                        <Checkbox
                            checked={!!selected[department.id]}
                            onChange={() => handleToggleSelect(department.id)}
                        />
                        <ListItemText primary={department.name} />
                        <IconButton onClick={() => handleToggleExpand(department.id)}>
                            {expanded[department.id] ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </ListItemButton>
                    <Collapse in={expanded[department.id]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {department.subDepartments.map((sub) => (
                                <ListItem key={sub.id} sx={{ pl: 4 }}>
                                    <Checkbox
                                        checked={!!selected[sub.id]}
                                        onChange={() => handleToggleSelect(sub.id, true, department.id)}
                                    />
                                    <ListItemText primary={sub.name} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </div>
            ))}
        </List>
    );
};

export default DepartmentList;
