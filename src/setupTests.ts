import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { jest } from '@jest/globals';
import { vi } from "vitest"
vi.mock('zustand')

global.jest = jest;